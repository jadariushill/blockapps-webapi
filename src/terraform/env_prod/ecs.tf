resource "aws_ecs_cluster" "blockapps_server_ecs_cluster" {
  name = var.ecs_cluster_name

  tags = local.tags
}



resource "aws_ecs_task_definition" "blockapps_server_task_def" {
  family = "blockapps-server-prod"
  memory = 512
  cpu = 256
  execution_role_arn = aws_iam_role.blockapps_server_ecs_execution_role.arn
  runtime_platform {
    operating_system_family = "LINUX"
  }
  requires_compatibilities = ["FARGATE"]
  network_mode = "awsvpc"
  container_definitions = jsonencode([
    {
      name      = "blockapps-server"
      image     = "${var.account_number}.dkr.ecr.us-east-1.amazonaws.com/blockappsserver:PROD"
      cpu       = 256
      memory    = 512
      essential = true
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
        }
      ]
    }
  ])
}


resource "aws_ecs_service" "blockapps_server_ecs_service" {
  name = "blockapps-server-prod"
  cluster = aws_ecs_cluster.blockapps_server_ecs_cluster.arn
  task_definition = aws_ecs_task_definition.blockapps_server_task_def.arn
  desired_count = 2
  launch_type = "FARGATE"
  network_configuration {
    assign_public_ip = true
    subnets = data.aws_subnets.vpc_subnets.ids
    security_groups = [aws_security_group.blockapps_server_sg.id]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.blockapps_server_alb_tg.arn
    container_name   = "blockapps-server"
    container_port   = var.container_port
  }
}

resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 4
  min_capacity       = 2
  resource_id        = "service/${aws_ecs_cluster.blockapps_server_ecs_cluster.name}/${aws_ecs_service.blockapps_server_ecs_service.name}"  
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
  role_arn           = aws_iam_role.ecs-autoscale-role.arn
}


resource "aws_appautoscaling_policy" "ecs_target_cpu" {
  name               = "application-scaling-policy-cpu"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value = 15
  }
  depends_on = [aws_appautoscaling_target.ecs_target]
}

resource "aws_appautoscaling_policy" "ecs_target_memory" {
  name               = "application-scaling-policy-memory"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
    target_value = 15
  }
  depends_on = [aws_appautoscaling_target.ecs_target]
}