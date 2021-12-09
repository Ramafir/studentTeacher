package pl.danielkolban.studentteacherapp.teacher;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.danielkolban.studentteacherapp.student.Student;
import pl.danielkolban.studentteacherapp.student.StudentService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {
    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }


    @GetMapping("")
    public List<Teacher> findAll(@RequestParam(required = false) String lastName) {
        if (lastName != null)
            return teacherService.findByLastName(lastName);
        else
            return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> findById(@PathVariable Long id) {
        return teacherService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/students")
    public List<Student> getTeacherStudents(@PathVariable Long id) {
        return teacherService.getTeacherStudents(id);
    }

    @PostMapping("")
    public ResponseEntity<Teacher> save(@RequestBody Teacher teacher) {
        if (teacher.getId() != null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saved object cannot have id set");
        Teacher savedTeacher = teacherService.save(teacher);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(teacher.getId())
                .toUri();
        return ResponseEntity.created(location).body(savedTeacher);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> update(@PathVariable Long id, @RequestBody Teacher teacher) {
        if (!id.equals(teacher.getId()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The updated object must have an id that matches the id in the resource path");
        Teacher updatedTeacher = teacherService.update(teacher);
        return ResponseEntity.ok(updatedTeacher);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable("id") Long id) {
        teacherService.deleteTeacher(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
