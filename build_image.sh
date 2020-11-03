#! /usr/bin/env bash

export IMAGE_NAME="fabwice/attestation-covid:q4-2020"

build()
{
    docker build \
        --force-rm=true \
        --no-cache=true \
        --build-arg=DEBUG=${DEBUG:-false} \
        -t ${IMAGE_NAME} \
        -f ./Dockerfile \
        .
}

clean()
{
    docker rmi "${IMAGE_NAME}" || die "Docker rmi has failed..."
}

main()
{
    if
        [[ "${CLEAN}" == "true" ]]; then
        clean;
    else
        build;
    fi
    exit 0
}

main "$@"
