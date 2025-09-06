package com.LuxReel.LuxReel.Repository;

import com.LuxReel.LuxReel.Models.Users;
import org.apache.catalina.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<Users, ObjectId> {
    Optional<Users> findByUsernameOrEmail(String username, String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
