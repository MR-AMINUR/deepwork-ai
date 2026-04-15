package com.deepwork.ai.service;

import com.deepwork.ai.entity.Meeting;
import com.deepwork.ai.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public Meeting saveMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id).orElse(null);
    }

    public void deleteMeeting(Long id)
    {
        meetingRepository.deleteById(id);
    }
}