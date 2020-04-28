package models

// Record - the record model
type Record struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Start    int64  `json:"start"`
	Finish   int64  `json:"finish"`
	Duration int64  `json:"duration"`
}

// RecordStore - the record store implementation can be in-memory or in DB
type RecordStore interface {
	Add(*Record) (*Record, error)
	List(fromTimestamp int64) ([]*Record, error)
}
