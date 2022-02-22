<?php

namespace App\Services;

use App\Models\Realty;
use Illuminate\Support\Collection;

class RealtyService {

    public function getList(Collection $filters)
    {
        return Realty::query()
            ->when($filters->get('city_id'), function ($query) use ($filters){
                return $query->where('city_id', $filters->get('city_id'));
            })
            ->when($filters->get('adv_type'), function ($query) use ($filters){
                return $query->where('adv_type', $filters->get('adv_type'));
            })
            ->when($filters->get('is_owner'), function ($query) use ($filters){
                return $query->where('is_owner', $filters->get('is_owner'));
            })
            ->when($filters->get('room_counts'), function ($query) use ($filters){
                return $query->whereIn('room_count', $filters->get('room_counts'));
            })
            ->when($filters->get('types'), function ($query) use ($filters){
                return $query->whereIn('type', $filters->get('types'));
            })
            ->when($filters->get('size_min'), function ($query) use ($filters){
                return $query->where('size_total', '>=', $filters->get('size_min'));
            })
            ->when($filters->get('size_max'), function ($query) use ($filters){
                return $query->where('size_total', '<=', $filters->get('size_max'));
            })
            ->when($filters->get('price_min'), function ($query) use ($filters){
                return $query->where('price', '>=', $filters->get('price_min'));
            })
            ->when($filters->get('price_max'), function ($query) use ($filters){
                return $query->where('price', '<=', $filters->get('price_max'));
            })
            ->when($filters->get('currency') && $filters->get('price_min') && $filters->get('price_max'), function ($query) use ($filters){
                return $query->where('currency', $filters->get('currency'));
            });
    }
}