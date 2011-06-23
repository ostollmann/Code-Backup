clear;

addpath('functions');

syms x;

sol = solve(f2(x),x);
fprintf('x1=%d, x2=%d\n', double(sol(1)), double(sol(1)));



restoredefaultpath();
