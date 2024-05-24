-- Ensure the database exists and is selected
CREATE DATABASE IF NOT EXISTS `genera-game-v3`;
USE `genera-game-v3`;

-- Insert data into the players table
INSERT INTO `players` (
    `name`, 
    `wallet`, 
    `password`, 
    `island_id`, 
    `townhall_lvl`, 
    `factory_lvl`, 
    `concrete_quarry_lvl`, 
    `crystals_quarry_lvl`, 
    `metals_quarry_lvl`, 
    `diesel_quarry_lvl`, 
    `refreshToken`
) VALUES
    (
        'test 2', 
        '0xCe8E2AAd6a2aE2C69B31e5CFa7512878c4cA4197', 
        '444444444', 
        1, 
        1, 
        1, 
        1, 
        1, 
        1, 
        1, 
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRlc3QgMiIsIndhbGxldCI6IjB4Q2U4RTJBQWQ2YTJhRTJDNjlCIn0sImlhdCI6MTcxNjQ2MTUxMiwiZXhwIjoxNzE2NTQ3OTEyfQ.3eT177Q4xq-7kQ4mIDeUaYKfZfajVyXXK-haIKh382k'
    );
