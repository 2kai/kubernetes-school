CREATE TABLE todos
(
    id      serial PRIMARY KEY,
    todo    VARCHAR(255) NOT NULL,
    is_done BOOLEAN      NOT NULL DEFAULT FALSE
);
