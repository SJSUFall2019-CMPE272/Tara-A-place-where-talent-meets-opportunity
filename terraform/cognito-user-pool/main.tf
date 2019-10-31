resource "aws_cognito_user_pool" "tara_pool" {

  name = "${var.user_pool_name}"

  admin_create_user_config {
    allow_admin_create_user_only = false
    unused_account_validity_days = 7

    invite_message_template {
      email_message = "Your username is {username} and temporary password is {####}. "
      email_subject = "Your temporary password"
      sms_message   = "Your username is {username} and temporary password is {####}. "
    }
  }

  alias_attributes = [
    "email",
    "phone_number",
    "preferred_username",
  ]

  auto_verified_attributes = [
    "email",
  ]

  device_configuration {
    challenge_required_on_new_device      = false
    device_only_remembered_on_user_prompt = false
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  email_verification_subject = "Your verification code"

  email_verification_message = "Your verification code is {####}. "

  mfa_configuration = "OPTIONAL"

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "given_name"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "phone_number"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  sms_authentication_message = "Your authentication code is {####}. "

  sms_configuration {
    external_id    = "476fe21a-2f38-407a-95be-eb66220351f6"
    sns_caller_arn = "arn:aws:iam::240377662125:role/service-role/TaraUserPool-SMS-Role"
  }

  sms_verification_message = "Your verification code is {####}. "

  tags = {
    "Name" = "tara-user-pool-sample"
  }
}