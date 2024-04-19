# WIP
THIS IS NOT MAINTAINED BY KINDE, THIS IS A HOBBY PROJECT FOR USING KINDE WITH REMIX IN CLOUDFLARE.

Fork for using kinde remix sdk on cloudflare, WIP

# kinde-remix-cloudflare-sdk

The original implementation uses remix/node and process.env, both of which are not easily supported on Cloudflare Worker environments.

Therfore this package rewrites those methods to instead use the Cloudflare-based replacements.

Additionally, it adds a setup method where config can be supplied at worker startup to avoid having to rely on process.env and enable more flexible configuration.

The tests are broken right now, but this is just a quick hack to fix some broken applications.

## Usage

A basic overview of the package usage is supplied by [kinde](https://kinde.notion.site/Remix-SDK-Docs-eeba8882b6254b7b9db20a62a927cc29).

WIP.

## Disclaimer

This package was mostly design for private hobby use and is largely copying what the original package already implemented. Please check for yourself if this is applicable to your use case and be aware that this package should not be considered production-ready. I have only open-sourced this package in case somebody else wants to try this exact use case or needs a reference for implementing an own solution.
