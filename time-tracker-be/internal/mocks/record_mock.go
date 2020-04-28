package mocks

import (
	"time-tracker-be/internal/models"
)

type RecordStoreMock struct {
	Invocations map[string][]interface{}
}

func (m *RecordStoreMock) Add(r *models.Record) (*models.Record, error)  {
	m.addToInvocations("Add", r)
	return r, nil
}

func (m *RecordStoreMock) List(from int64) ([]*models.Record, error)  {
	m.addToInvocations("List", from)
	return nil, nil
}

func (m *RecordStoreMock) addToInvocations(key string, i interface{})  {
	curr := m.Invocations[key]
	if curr == nil {
		m.Invocations[key] = append([]interface{}{}, i)
	} else {
		m.Invocations[key] = append(curr, i)
	}
}

func NewRecordStoreMock() RecordStoreMock {
	return RecordStoreMock{ Invocations: map[string][]interface{}{}}
}