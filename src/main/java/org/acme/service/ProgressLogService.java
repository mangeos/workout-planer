package org.acme.service;

import java.util.List;
import java.util.stream.Collectors;
import org.acme.dto.ProgressLogDto;
import org.acme.models.Exercise;
import org.acme.models.ProgressLog;
import org.acme.models.UserEntity;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class ProgressLogService {

    public List<ProgressLogDto>getAllProgressLogs(){
        List<ProgressLog> progress = ProgressLog.listAll();
        return progress
                .stream()
                .map(ProgressLogDto::new)
                .collect(Collectors.toList());
    }

    public ProgressLogDto getProgressLogById(Long id){
        
        ProgressLog progress = ProgressLog.findById(id);
        return new ProgressLogDto(progress);
    }

    @Transactional
    public ProgressLogDto createProgressLog(ProgressLogDto dtoCreate){
        if (dtoCreate.getUser() == null || dtoCreate.getUser().getId() == null) {
            return null;
        }

        UserEntity userEntity = UserEntity.findById(dtoCreate.getUser().getId());
        if (userEntity == null) {
            return null;
        }
        
        Exercise ex = new Exercise();
        ex.id = dtoCreate.getExercise().getId();


        ProgressLog progress = new ProgressLog();
        progress.setDate(dtoCreate.getDate());
        progress.setExercise(ex);
        progress.setReps(dtoCreate.getReps());
        progress.setSets(dtoCreate.getSets());
        progress.setUser(userEntity);
        progress.setWeight(dtoCreate.getWeight());
        progress.persist();
        
        return new ProgressLogDto(progress);
    }
    
    @Transactional
    public ProgressLogDto updateProgressLog(Long id, ProgressLogDto dto){
        
        return null;
    }

    @Transactional
    public boolean deleteProgressLog(Long id){
        return true;
    }

}
    
