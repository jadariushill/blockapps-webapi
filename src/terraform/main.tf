provider "aws" {

  region     = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "blockapps-server-backend-prod"
    key    = "state/terraform.tfstate"
    region = "us-east-1"
    skip_credentials_validation = true
  }
}

# module "env_test" {
#   count          = var.env == "test" ? 1 : 0
# }

module "env_prod" {
  count            = var.env == "prod" ? 1 : 0
  source           = "./env_prod"
  ecs_cluster_name = "BlockApps-Server-Prod"
  account_number   = var.account_number
  container_port   = 3000
  vpc_id           = var.vpc_id
  env              = var.env
}