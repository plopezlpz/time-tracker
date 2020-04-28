CREATE TABLE IF NOT EXISTS records(
  id SERIAL,
  name VARCHAR(150),
  start BIGINT,
  finish BIGINT,
  duration BIGINT
);

CREATE INDEX IF NOT EXISTS records_finish_idx ON records(finish);