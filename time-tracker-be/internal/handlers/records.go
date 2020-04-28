package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
	"time-tracker-be/internal/models"
)

// GetRecords will get the list of records
func GetRecords(s models.RecordStore) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := c.Query("start")
		if start == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "'start' query param is required"})
			return
		}
		since, err := strconv.ParseInt(start, 10, 64)
		if err != nil || since < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "'start' must be a positive integer"})
			return
		}
		recs, err := s.List(since)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, recs)
	}
}

type addRecordReq struct {
	Name   string `json:"name" binding:"required,max=100"`
	Start  int64  `json:"start" binding:"required,min=0"`
	Finish int64  `json:"finish" binding:"required,min=0"`
}

// AddRecord will add a record
func AddRecord(s models.RecordStore) gin.HandlerFunc {
	return func(c *gin.Context) {
		body := &addRecordReq{}
		err := c.Bind(body)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		rec, err := s.Add(&models.Record{
			Name:     body.Name,
			Start:    body.Start,
			Finish:   body.Finish,
			Duration: body.Finish - body.Start,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, rec)
	}
}
