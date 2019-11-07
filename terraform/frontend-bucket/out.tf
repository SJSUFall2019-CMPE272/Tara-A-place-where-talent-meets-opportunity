output "bucket_domain_name" {
  value = "${aws_s3_bucket.s3-bucket.bucket_domain_name}"
}

output "cloudfront_access_identity_path" {
  value = "${aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path}"
}
