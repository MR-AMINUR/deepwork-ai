package com.deepwork.ai.service;

import com.deepwork.ai.entity.Meeting;
import com.deepwork.ai.entity.Summary;
import com.deepwork.ai.exception.ResourceNotFoundException;
import com.deepwork.ai.repository.MeetingRepository;
import com.deepwork.ai.repository.SummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SummaryService {

    @Autowired
    private SummaryRepository summaryRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    public Summary saveSummary(Long meetingId, Summary summary) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with id: " + meetingId));

        summary.setMeeting(meeting);
        return summaryRepository.save(summary);
    }

    public Summary getSummary(Long id) {
        return summaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Summary not found with id: " + id));
    }
}