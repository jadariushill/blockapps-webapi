resource "aws_lb_target_group" "blockapps_server_alb_tg" {
  port        = var.container_port
  protocol    = "HTTP"
  tags        = local.tags
  target_type = "ip"
  vpc_id      = var.vpc_id

  lifecycle {
    create_before_destroy = true
  }
}


resource "aws_lb_listener" "blockapps_server_alb_listener" {
  load_balancer_arn = aws_lb.blockapps_server_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blockapps_server_alb_tg.arn
  }
}

resource "aws_lb" "blockapps_server_alb" {
  name               = "blockapps-server-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.blockapps_server_alb_sg.id]
  subnets =  [data.aws_subnets.vpc_subnets.ids[0],data.aws_subnets.vpc_subnets.ids[1],data.aws_subnets.vpc_subnets.ids[2],
  data.aws_subnets.vpc_subnets.ids[3],data.aws_subnets.vpc_subnets.ids[4],data.aws_subnets.vpc_subnets.ids[5]]
  enable_deletion_protection = false
  tags = local.tags
}