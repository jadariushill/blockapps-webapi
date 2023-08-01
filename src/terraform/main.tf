provider "aws" {
  access_key = var.access_key
  secret_key = var.secret_key
  region     = var.region
}

terraform {
  backend "s3" {
  }
}

module "env_prod" {
  count            = var.env == "prod" ? 1 : 0
  source           = "./env_prod"
  ecs_cluster_name = "BlockApps-Server-Prod"
  account_number   = var.account_number
  container_port   = 3000
  vpc_id           = var.vpc_id
  env              = var.env
}
