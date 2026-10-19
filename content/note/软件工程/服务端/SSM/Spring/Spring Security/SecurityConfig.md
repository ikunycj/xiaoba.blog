```java
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPoint;
    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            	//关闭csrf
                .csrf().disable()
            	//不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
            	// 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
            	// 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
		//把token校验过滤器添加到过滤器链中
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);
		//全局自定义异常处理
        http.exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);
		//允许跨域
        http.cors();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
```