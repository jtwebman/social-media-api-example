#!/bin/bash
set -eo pipefail

host="0.0.0.0"
user="${2:-social-media-user}"
db="${1:-social-media}"
export PGPASSWORD="${3:-password123!}"

args=(
	# force postgres to not use the local unix socket (test "external" connectibility)
	--host "$host"
	--username "$user"
	--dbname "$db"
	--quiet --no-align --tuples-only
)

if select="$(echo 'SELECT 1' | psql "${args[@]}")" && [ "$select" = '1' ]; then
	exit 0
fi

exit 1
