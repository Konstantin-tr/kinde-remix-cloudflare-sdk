# NOTICE
This is a fork for using kinde remix sdk on cloudflare, it is currently WIP and not meant for production use.

If you find any issues, feel free to post them or open an MR.

# kinde-remix-cloudflare-sdk

The original repo is https://github.com/kinde-oss/kinde-remix-sdk.

The original implementation uses remix/node and process.env, both of which are not easily supported on Cloudflare Worker environments.

Therefore, this package rewrites those methods to instead use the Cloudflare-based replacements.

Additionally, it adds a setup method where config can be supplied at worker startup to avoid having to rely on process.env and enable more flexible configuration.

The tests are broken right now, but this is just a quick hack to fix some broken applications.

## Usage

An overview of how to use kinde with remix is supplied in the [kinde docs](https://kinde.com/docs/developer-tools/remix-sdk/).

This package is slightly adapted, but the main difference is needing to supply a config when calling the sdk-methods to avoid depedencies on process.env

## Disclaimer

This package was mostly designed for private hobby use and is largely copying what the original package already implemented. Please check for yourself if this applies to your use case and be aware that this package should not be considered production-ready. I have only open-sourced this package in case somebody else wants to try this exact use case or needs a reference for implementing their own solution.
