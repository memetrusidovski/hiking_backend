package com.example.SpringJWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MyUserDetailsService implements UserDetailsService {


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        //Optional<User> user = userRepository.findByUserName(userName);

        //user.orElseThrow(() -> new UsernameNotFoundException("User not found: " + userName));

        //return user.map(MyUserDetails::new).get();
        return new User("test", "pass", new ArrayList<>());
    }
}
