import { supabase } from '../lib/supabase';
import { notFound } from '../lib/errors';

// [과제 1] 공연 목록 조회
export async function listPerformances() {
  const { data, error } = await supabase
    .from('performances')
    .select('id, title, venue, starts_at, price, seats(id, row_label, seat_number, is_available)')
    .order('id', { ascending: true }); // [과제 1-1]

  if (error) throw error;

  return data.map((p: any) => {
    const seats = p.seats ?? [];
    return {
      id: p.id,
      title: p.title,
      venue: p.venue,
      starts_at: p.starts_at,
      price: p.price,
      seats,
      available_count: seats.filter((s: any) => s.is_available).length, // [과제 1-2]
      total_count: seats.length, // [과제 1-3]
    };
  });
}

// [과제 2] 공연 상세 조회
export async function getPerformance(id: number) {
  const { data, error } = await supabase
    .from('performances')
    .select('id, title, venue, starts_at, price, seats(id, row_label, seat_number, is_available)')
    .eq('id', id) // [과제 2-1]
    .single();

  if (error || !data) throw notFound('공연을 찾을 수 없습니다.'); // [과제 2-2]

  const seats: any[] = data.seats ?? [];
  return {
    id: data.id,
    title: data.title,
    venue: data.venue,
    starts_at: data.starts_at,
    price: data.price,
    seats,
    available_count: seats.filter((s) => s.is_available).length,
    total_count: seats.length,
  };
}