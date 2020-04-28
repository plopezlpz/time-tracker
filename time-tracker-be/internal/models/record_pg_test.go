package models

import (
	"github.com/DATA-DOG/go-sqlmock"
	"testing"
)

func TestRecordDAO_Add(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	mock.ExpectQuery("INSERT INTO records").WithArgs("a", 1, 10, 9).WillReturnRows(
		sqlmock.NewRows([]string{"id", "name", "start", "finish", "duration"}).AddRow(1, "a", 1, 10, 9))
	dao := recordDAO{db:db}
	_, err = dao.Add(&Record{
		Name:     "a",
		Start:    1,
		Finish:   10,
		Duration: 9,
	})
	if err != nil {
		t.Errorf("error on adding: %s", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}

func TestRecordDAO_List(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}
	defer db.Close()

	mock.ExpectQuery("SELECT id, name, start, finish, duration FROM records WHERE finish").WithArgs(10).WillReturnRows(
		sqlmock.NewRows([]string{"id", "name", "start", "finish", "duration"}).AddRow(1, "a", 1, 10, 9))
	dao := recordDAO{db:db}
	_, err = dao.List(10)
	if err != nil {
		t.Errorf("error on adding: %s", err)
	}

	if err := mock.ExpectationsWereMet(); err != nil {
		t.Errorf("there were unfulfilled expectations: %s", err)
	}
}