package com.example.hiking;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
public class HikingApplication {

	public static void main(String[] args) {
		SpringApplication.run(HikingApplication.class, args);
	}

}
