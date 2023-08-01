resource "aws_security_group" "blockapps_server_sg" {
  name        = "blockapps_server_sg_${var.env}"
  description = "BlockApps Server ECS Security Group"
  vpc_id      = var.vpc_id

  ingress {
    from_port         = var.container_port
    to_port           = var.container_port
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = local.tags
}


resource "aws_security_group" "blockapps_server_alb_sg" {
  name        = "blockapps_server_alb_sg_${var.env}"
  description = "BlockApps Server ALB Security Group"
  vpc_id      = var.vpc_id

  ingress {
    from_port         = 80
    to_port           = 80
    protocol          = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = local.tags
}