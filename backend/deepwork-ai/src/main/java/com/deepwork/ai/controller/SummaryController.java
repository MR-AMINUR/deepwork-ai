package com.deepwork.ai.controller;

import com.deepwork.ai.entity.Summary;
import com.deepwork.ai.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summaries")
public class SummaryController {

    @Autowired
    public SummaryService summaryService;

//    @PostMapping
//    public Summary createSummary(@RequestBody Summary summary)
//    {
//        return summaryService.saveSummary(summary);
//    }
    @PostMapping
    public Summary createSummary(@RequestParam Long meetingId, @RequestBody Summary summary)
    {
        return summaryService.saveSummary(meetingId, summary);
    }

    @GetMapping("/{id}")
    public Summary getSummary(@PathVariable Long id)
    {
        return summaryService.getSummary(id);
    }
}
