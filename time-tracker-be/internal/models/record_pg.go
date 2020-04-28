package models

import (
	"database/sql"
)

type recordDAO struct {
	db *sql.DB
}

// Add a record
func (m *recordDAO) Add(r *Record) (*Record, error) {
	res := Record{}
	err := m.db.QueryRow(`INSERT INTO records (name, start, finish, duration)
		VALUES($1, $2, $3, $4) RETURNING id, name, start, finish, duration`,
		r.Name, r.Start, r.Finish, r.Duration).Scan(&res.ID, &res.Name, &res.Start, &res.Finish, &res.Duration)

	if err != nil {
		return nil, err
	}
	return &res, nil
}

// List records since timestamp
func (m *recordDAO) List(fromTimestamp int64) ([]*Record, error) {
	rows, err := m.db.Query(`SELECT id, name, start, finish, duration FROM records
		WHERE finish > $1 ORDER BY finish DESC`, fromTimestamp)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	records := []*Record{}
	for rows.Next() {
		r := Record{}
		err = rows.Scan(&r.ID, &r.Name, &r.Start, &r.Finish, &r.Duration)
		if err != nil {
			return nil, err
		}
		records = append(records, &r)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return records, nil
}

// NewRecordDBStore - creates a new DB store
func NewRecordDBStore(db *sql.DB) RecordStore {
	return &recordDAO{db: db}
}
