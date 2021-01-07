package com.example.Securitytest.Services;

import com.example.Securitytest.Models.User;
import com.example.Securitytest.Respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddUserService {

    @Autowired
    private UserRepository userRepository;

    public int addUser(User user){
        userRepository.save(user);
        return 1;
    }
}
