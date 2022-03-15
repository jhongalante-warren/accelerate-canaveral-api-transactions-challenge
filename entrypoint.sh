#!/usr/bin/env sh

case ${NODE_ENV} in
  ("development") export CONFD_PREFIX="/dev_api"; export CONFD_ARGS="-log-level debug";;
  ("staging") export CONFD_PREFIX="/stg_api"; export CONFD_ARGS="-log-level debug";;
  ("production") export CONFD_PREFIX="/prd_api";;
esac

confd \
  --onetime \
  -prefix ${CONFD_PREFIX} \
  -confdir ./confd \
  -config-file ./confd/confd.toml \
  ${CONFD_ARGS}

${@}
