fn main() {
    let start = 347312;
    let end = 805915;

    let mut hit_counter: i32 = 0;
    for n in start .. end+1 {
        if has_two_adjacent_digits(&n) && never_decreases(&n) {
            hit_counter += 1;
        }
    }
    println!("{} hits in range {}-{}", hit_counter, start, end)
}

fn has_two_adjacent_digits(n: &i32) -> bool {
    let as_string = n.to_string();
    let digit_list = as_string.char_indices();

    let mut last_digit: char = '0';

    for (i, digit) in digit_list {
        if i == 0 {
            last_digit = digit;
            continue;
        }

        if digit == last_digit {
            return true;
        }

        last_digit = digit;
    }

    return false;
}

fn never_decreases(n: &i32) -> bool {
    let as_string = n.to_string();
    let digit_list = as_string.chars();

    let mut last_digit: char = '0';

    for digit in digit_list {
        if digit < last_digit {
            return false;
        }

        last_digit = digit;
    }

    return true;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_has_two_adjacent_digits() {
        struct Case {
            n: i32,
            output: bool,
        }

        let cases = vec![
            Case {
                n: 444444,
                output: true,
            },
            Case {
                n: 123456,
                output: false
            },
            Case {
                n: 122345,
                output: true
            },
            Case {
                n: 123452,
                output: false
            },
        ];

        for case in cases.iter() {
            let res = has_two_adjacent_digits(&case.n);

            assert_eq!(case.output, res, "{}", case.n);
        }
    }

    #[test]
    fn test_never_decreases() {
        struct Case {
            n: i32,
            output: bool,
        }

        let cases = vec![
            Case {
                n: 444444,
                output: true,
            },
            Case {
                n: 123456,
                output: true
            },
            Case {
                n: 122645,
                output: false
            },
            Case {
                n: 123452,
                output: false
            },
        ];

        for case in cases.iter() {
            let res = never_decreases(&case.n);

            assert_eq!(case.output, res, "{}", case.n);
        }
    }
}