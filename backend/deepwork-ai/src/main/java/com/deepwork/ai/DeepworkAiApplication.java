//package com.deepwork.ai;
//
//import com.deepwork.ai.entity.Meeting;
//import com.deepwork.ai.entity.User;
//import jakarta.transaction.*;
//import org.hibernate.HibernateException;
//import org.hibernate.Session;
//import org.hibernate.SessionFactory;
//import org.hibernate.Transaction;
//import org.hibernate.cfg.Configuration;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.persistence.autoconfigure.EntityScan;
//import com.deepwork.ai.repository.UserRepository;
//
//@SpringBootApplication
//@EntityScan("com.deepwork.ai.entity")
//public class DeepworkAiApplication implements CommandLineRunner {
//
//	@Autowired
//	private UserRepository userRepository;
//	public static void main(String[] args) {
//		 SpringApplication.run(DeepworkAiApplication.class, args);
//
//
//    }
//
//	@Override
//	public void run(String... args) throws Exception {
//
//		User user = new User();
//		user.setName("Aminur");
//		user.setEmail("aminur@test.com");
//
//		userRepository.save(user);
//
//		System.out.println("user saved to database!");
//
//		userRepository.findAll().forEach(u -> {
//			System.out.println(u.getName());
//			System.out.println(u.getEmail());
//		});
//	}
//}
package com.deepwork.ai;

import com.deepwork.ai.entity.Meeting;
import com.deepwork.ai.entity.User;
import com.deepwork.ai.repository.MeetingRepository;
import com.deepwork.ai.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DeepworkAiApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MeetingRepository meetingRepository;

	public static void main(String[] args) {
		SpringApplication.run(DeepworkAiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {


	}
}