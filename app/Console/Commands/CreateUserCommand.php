<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUserCommand extends Command
{
    protected $signature = 'app:user:create';

    protected $description = 'Create a local application user';

    public function handle(): int
    {
        $name = $this->ask('Name');
        $email = $this->ask('Email');
        $password = $this->secret('Password');

        if (!is_string($name) || trim($name) === '') {
            $this->error('Name is required.');

            return Command::FAILURE;
        }

        if (!is_string($email) || trim($email) === '') {
            $this->error('Email is required.');

            return Command::FAILURE;
        }

        if (!is_string($password) || $password === '') {
            $this->error('Password is required.');

            return Command::FAILURE;
        }

        if (User::where('email', $email)->exists()) {
            $this->error('A user with this email already exists.');

            return Command::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ]);

        $this->info("User {$user->email} created with ID {$user->id}.");

        return Command::SUCCESS;
    }
}
