package com.bt.scrumble.services;

import com.bt.scrumble.dto.Issue;
import com.bt.scrumble.models.Sprint;

import java.util.ArrayList;
import java.util.List;

public interface ISprintService {
    Sprint createSprint(int workspaceId, Sprint sprint, String accessToken);

    Sprint editSprint(int workspaceId, Sprint sprint, String accessToken);

    List<Sprint> getSprintsForWorkspace(int workspaceId, String filter);

    Issue setSprintForIssue(int workspaceId, Issue issue, List<Sprint> sprints);

    int getMilestoneId(int workspaceId, int projectId, int sprintId);

    ArrayList<Issue> getSprintIssues(int workspaceId, Sprint sprint, String accessToken);
}