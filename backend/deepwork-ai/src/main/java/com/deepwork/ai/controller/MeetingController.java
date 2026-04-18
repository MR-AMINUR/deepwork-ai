package com.deepwork.ai.controller;

import com.deepwork.ai.ai.AIClientService;
import com.deepwork.ai.ai.AIResponse;
import com.deepwork.ai.entity.*;
import com.deepwork.ai.repository.MeetingRepository;
import com.deepwork.ai.service.MeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    @Autowired
    private AIClientService aiClientService;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private MeetingService meetingService;

    @PostMapping("/upload")
    public Meeting uploadMeeting(@RequestParam("file") MultipartFile file, @RequestParam("title") String title) {

        //Step 1: Call AI Service

        AIResponse aiResponse = aiClientService.processAudio(file);

        //Step 2: Create Meeting
        Meeting meeting = new Meeting();
        meeting.setTitle(title);
        meeting.setAudioPath(file.getOriginalFilename());
        meeting.setTranscript(aiResponse.getTranscript());

        //Step 3: Create Summary
        Summary summary = new Summary();
        summary.setSummaryText(aiResponse.getSummary());
        summary.setMeeting(meeting);

        //Step 4: Create Tasks

        List<Task> tasks = new ArrayList<>();

        if (aiResponse.getTasks() != null) {
            for (String taskText : aiResponse.getTasks()) {
                Task task = new Task();
                task.setTaskText(taskText);
                task.setSummary(summary);
                task.add(task);
            }
        }

        summary.setTasks(tasks);
        meeting.setSummary(summary);

        // Step 5: Save everything

        return meetingRepository.save(meeting);
    }


    @PostMapping
    public Meeting createMeeting(@RequestBody Meeting meeting) {
        return meetingService.saveMeeting(meeting);
    }

    @GetMapping
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    @GetMapping("/{id}")
    public Meeting getMeetingById(@PathVariable Long id)
    {
        return meetingService.getMeetingById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id)
    {
        meetingService.deleteMeeting(id);
    }
}