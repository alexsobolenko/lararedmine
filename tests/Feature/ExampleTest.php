<?php

declare(strict_types=1);

namespace Tests\Feature;

use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');
        $response->assertStatus(Response::HTTP_OK);
    }
}
