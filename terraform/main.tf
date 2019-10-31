provider "aws" {
  region  = "us-east-1"
  profile = "default"
}

module "tara_s3_frontend__bucket" {
  source      = "./frontend-bucket"
  bucket_name = "tara-frontend"
}

module "tara_user_pool" {
  source         = "./cognito-user-pool"
  user_pool_name = "tara-user-pool"
}

/* module "tara_vpc" {
  source   = "./vpc"
  key_name = "${module.key_pair_tara.key_name}"
  vpc_name = "tara-vpc"
}

module "key_pair_tara" {
  source     = "./key_pair"
  key_name   = "cmpe272-tara-us-east-1"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDM1GqretG3cj97ut144mgd1qselm2nGKwYWbzwO6N9azDJtbDZ5LzogTHE3lXdHwYeio1pUSX4wtKaNZozKd+PmuftWHVnI41us1C39McLKeY0oAni5N+2yKdj4YiChLY0Lnpk07i9YtUmbg/AkoVn23BFKvaaDgI34Jfce1R6Ht+IzOwY+enjPRh9yL0G5i/hR/ADhG9iufueI1vCARp6Dtn3vKAlzX53W6Fn1Q3HPkTf6ud8wc+g4H9Shpkn4tVyHGJ/+rxo16udhe5YnKDsR+eqoAzqMAbXEXV5tmOxL386WK8tL0rp7Vc3kQkgCV9GIC++WS96EJrziOLUuCBt akshay@DESKTOP-0TGBRR7"
} */