resource "aws_cloudfront_distribution" "cloudfront_distribution" {

        default_cache_behavior {
        allowed_methods        = [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "PATCH",
            "POST",
            "PUT",
        ]
        cached_methods         = [
            "GET",
            "HEAD",
        ]
        compress               = false
        default_ttl            = 86400
        max_ttl                = 31536000
        min_ttl                = 0
        smooth_streaming       = false
        target_origin_id       = "S3-${var.bucket_name}"
        viewer_protocol_policy = "redirect-to-https"

        forwarded_values {
            headers                 = []
            query_string            = true
            query_string_cache_keys = []

            cookies {
                forward           = "none"
                whitelisted_names = []
            }
        }
    }
    
    default_root_object            = "index.html"
    enabled                        = true
    is_ipv6_enabled                = true
    http_version                   = "http2"

    origin {
        domain_name = "${var.bucket_domain_name}"
        origin_id   = "S3-${var.bucket_name}"

        s3_origin_config {
            origin_access_identity = "${var.cloudfront_access_identity_path}"
        }
    }

    price_class                    = "PriceClass_100"
    retain_on_delete               = false
    wait_for_deployment            = true

    

    restrictions {
        geo_restriction {
            locations        = []
            restriction_type = "none"
        }
    }

    viewer_certificate {
        cloudfront_default_certificate = true
        minimum_protocol_version       = "TLSv1"
    }
}


