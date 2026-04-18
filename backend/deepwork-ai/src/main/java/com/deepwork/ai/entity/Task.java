package com.deepwork.ai.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String taskText;

    private String deadline;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="summary_id")
    @JsonBackReference
    private Summary summary;

    public Task()
    {

    }

    public void add(Task task) {

    }
}
