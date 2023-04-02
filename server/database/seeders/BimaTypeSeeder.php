<?php

namespace Database\Seeders;

use App\Models\BimaType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BimaTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    use WithoutModelEvents;
    public function run()
    {
        BimaType::create([
            'type' => 'All'
        ]);
        BimaType::create([
            'type' => 'BIMA KUBWA NA NDOGO'
        ]);
        BimaType::create([
            'type' => 'BIMA YA KATI NA NDOGO'
        ]);
        BimaType::create([
            'type' => 'BIMA KUBWA NA YA KATI'
        ]);
        BimaType::create([
            'type' => 'BIMA KUBWA'
        ]);
        BimaType::create([
            'type' => 'BIMA YA KATI'
        ]);
        BimaType::create([
            'type' => 'BIMA NDOGO'
        ]);
    }
}
