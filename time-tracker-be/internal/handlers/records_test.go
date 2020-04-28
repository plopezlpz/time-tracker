package handlers

import (
	"bytes"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
	"time-tracker-be/internal/mocks"
	"time-tracker-be/internal/models"
)

func TestGetRecords(t *testing.T) {
	tests := []struct {
		name         string
		path         string
		wantedArg    int64
		wantedStatus int
	}{
		{
			name:         "OK",
			path:         "/records?start=10",
			wantedArg:    10,
			wantedStatus: http.StatusOK,
		},
		{
			name:         "OK zero",
			path:         "/records?start=0",
			wantedArg:    0,
			wantedStatus: http.StatusOK,
		},
		{
			name:         "Not OK negative",
			path:         "/records?start=-1",
			wantedStatus: http.StatusBadRequest,
		},
		{
			name:         "Not OK missing 'start'",
			path:         "/records",
			wantedStatus: http.StatusBadRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create a response recorder
			w := httptest.NewRecorder()
			r := gin.Default()

			recordsStore := mocks.NewRecordStoreMock()
			// Routes setup
			r.GET("/records", GetRecords(&recordsStore))

			// Create a request to send to the above route
			req, _ := http.NewRequest("GET", tt.path, nil)
			r.ServeHTTP(w, req)

			if w.Code != tt.wantedStatus {
				t.Errorf("Should return %v status", tt.wantedStatus)
			}
			if tt.wantedStatus >= 400 {
				return
			}
			method := "List"
			if len(recordsStore.Invocations[method]) != 1 {
				t.Errorf("Should have invoked '%v'", method)
			}
			arg, ok := recordsStore.Invocations[method][0].(int64)
			if !ok {
				t.Errorf("cannot cast argument of '%v(int64)' to int64", method)
			}
			if arg != tt.wantedArg {
				t.Errorf("should have called %v(%v) on the store", method, tt.wantedArg)
			}

		})
	}
}

func TestAddRecords(t *testing.T) {
	tests := []struct {
		name             string
		path             string
		record           addRecordReq
		wantedArg        *models.Record
		wantedStatus     int
	}{
		{
			name:             "OK",
			record:           addRecordReq{Name: "r1", Start: 1, Finish: 10},
			wantedArg:        &models.Record{Name: "r1", Start: 1, Finish: 10, Duration:9},
			wantedStatus:     http.StatusOK,
		},
		{
			name:             "Not OK required fields",
			record:           addRecordReq{Name: "", Start: 1, Finish: 10},
			wantedStatus:     http.StatusBadRequest,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create a response recorder
			w := httptest.NewRecorder()
			r := gin.Default()

			recordsStore := mocks.NewRecordStoreMock()
			// Routes setup
			r.POST("/records", AddRecord(&recordsStore))

			// Create a request to send to the above route
			buf := new(bytes.Buffer)
			json.NewEncoder(buf).Encode(tt.record)
			req, _ := http.NewRequest("POST", "/records", buf)
			req.Header.Set("Content-Type", "application/json")
			r.ServeHTTP(w, req)

			if w.Code != tt.wantedStatus {
				t.Errorf("Should return %v status", tt.wantedStatus)
			}
			if tt.wantedStatus >= 400 {
				return
			}
			method := "Add"
			if len(recordsStore.Invocations[method]) != 1 {
				t.Errorf("Should have invoked '%v'", method)
			}
			arg, ok := recordsStore.Invocations[method][0].(*models.Record)
			if !ok {
				t.Errorf("cannot cast argument of '%v(*models.Record)' to *models.Record", method)
			}
			ok = assert.EqualValues(t, tt.wantedArg, arg)
			if !ok {
				t.Errorf("expected %v, got %v", tt.wantedArg, arg)
			}

		})
	}
}
