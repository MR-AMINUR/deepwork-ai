package com.deepwork.ai.repository;

import com.deepwork.ai.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
