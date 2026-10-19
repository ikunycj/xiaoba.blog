// 员工表 user_table 
// 部门表 businiss_table

SELECT u.department_id, u.user_id, u.salary
FROM user_table u
JOIN (
    SELECT department_id, MAX(salary) AS max_salary
    FROM user_table
    GROUP BY department_id
) AS max_salaries
ON u.department_id = max_salaries.department_id AND u.salary = max_salaries.max_salary;
