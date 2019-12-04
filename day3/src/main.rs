// https://adventofcode.com/2019/day/3

use bit_vec::BitVec;
use std::collections::HashMap;
use std::fs;
use std::io::Error;

#[derive(Copy, Clone)]
#[derive(Hash)]
struct Point {
    x: i64,
    y: i64,
}

impl PartialEq for Point {
    fn eq(&self, other: &Self) -> bool {
        self.x == other.x && self.y == other.y
    }
}

impl Eq for Point {}

fn main() -> Result<(), Error> {
    let data = match fs::read_to_string("./data.txt") {
        Ok(data) => data,
        Err(e) => return Err(e),
    };
    let wires: Vec<&str> = data.trim().split("\n").collect();
    let wire1: Vec<&str> = wires[0].split(",").collect();
    let wire2: Vec<&str> = wires[1].split(",").collect();

    let manhattan_distance = get_best_manhattan_distance(wire1, wire2);
    println!("manhattan distance: {}", manhattan_distance);

    Ok(())
}

fn get_best_manhattan_distance(wire1: Vec<&str>, wire2: Vec<&str>) -> i64 {
    let mut board: HashMap<Point, BitVec> = HashMap::new();

    let current_position = Point {
        x: 0,
        y: 0,
    };

    for instr in wire1.iter() {
        if instr.len() == 0 {
            break;
        };
        let direction: char = instr.chars().next().unwrap();
        let distance: i64 = instr[1..].parse().unwrap();

        let mut new_position = current_position;

        if direction == 'U' {
            new_position.y += distance;
        } else if direction == 'D' {
            new_position.y -= distance;
        } else if direction == 'L' {
            new_position.x -= distance;
        } else if direction == 'R' {
            new_position.x += distance;
        }

        // guaranteed a wire won't cross itself, so this must be a new point
        board.insert(new_position, BitVec::from_elem(2, false));
        if let Some(pos) = board.get_mut(&new_position) {
            pos.set(0, true);
        }
    }

    for instr in wire2.iter() {
        if instr.len() == 0 {
            break;
        };
        let direction: char = instr.chars().next().unwrap();
        let distance: i64 = instr[1..].parse().unwrap();

        let mut new_position = current_position;

        if direction == 'U' {
            new_position.y += distance;
        } else if direction == 'D' {
            new_position.y -= distance;
        } else if direction == 'L' {
            new_position.x -= distance;
        } else if direction == 'R' {
            new_position.x += distance;
        }

        // may be an old point or a new one
        let pos = board.entry(new_position).or_insert(BitVec::from_elem(2, false));
        // set it just to be sure
        pos.set(1, true);
    }

    let mut best_crossing = Point {
        x: 100000,
        y: 100000,
    };

    for (position, bv) in board {
        if bv.iter().filter(|x| *x).count() == 2 {
            let new_manhattan_distance = position.x.abs() + position.y.abs();
            let old_manhattan_distance = best_crossing.x.abs() + best_crossing.y.abs();
            println!("{}, {} | {}", position.x, position.y, new_manhattan_distance);

            if new_manhattan_distance < old_manhattan_distance {
                best_crossing = position
            }
        }
    }

    println!("x: {}, y: {}", best_crossing.x, best_crossing.y);
    return best_crossing.x.abs() + best_crossing.y.abs();
}
