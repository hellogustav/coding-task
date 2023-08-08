FROM ubuntu:20.04

VOLUME /var/lib/docker

WORKDIR /app

ENV OTP_VERSION="24.3.3-1" \
  ELIXIR_VERSION="1.13.0" \
  LANG=C.UTF-8 \
  DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN set -ex; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    git \
    ssh-client \
    apt-utils \
    apt-transport-https \
    ca-certificates \
    gnupg \
    curl \
    wget \
    bash \
    build-essential \
    inotify-tools \
  && rm -rf /var/lib/apt/lists/*

# Install erlang and elixir from the erlang-solutions repo
# https://www.erlang-solutions.com/resources/download.html
RUN set -ex; \
  wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -P /tmp; \
  dpkg -i /tmp/erlang-solutions_2.0_all.deb > /dev/null 2>&1; \
  apt-get update; \
  apt-get install -y \
    esl-erlang=1:$OTP_VERSION \
    elixir=$ELIXIR_VERSION-*

# Install Hex and Rebar
RUN mix local.hex --force && \
   mix local.rebar --force
