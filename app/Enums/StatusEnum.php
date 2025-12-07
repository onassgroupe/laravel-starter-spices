<?php

namespace App\Enums;

enum StatusEnum: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case PENDING = 'pending';
    case ARCHIVED = 'archived';

    public function label(): string
    {
        return match($this) {
            self::ACTIVE => 'Actif',
            self::INACTIVE => 'Inactif',
            self::PENDING => 'En attente',
            self::ARCHIVED => 'Archivé',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::ACTIVE => 'green',
            self::INACTIVE => 'gray',
            self::PENDING => 'yellow',
            self::ARCHIVED => 'red',
        };
    }
}
