package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func corsAndOptions(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	if c.Request.Method == "OPTIONS" {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
		c.Header("Access-Control-Allow-Headers", "authorization, origin, content-type, accept")
		c.Header("Allow", "HEAD,GET,POST,PUT,PATCH,DELETE,OPTIONS")
		c.Header("Content-Type", "application/json")
		c.AbortWithStatus(http.StatusOK)
	} else {
		c.Next()
	}
}