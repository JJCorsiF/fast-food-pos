<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude(['vendor'])
    ->in(__DIR__)
;

$config = new PhpCsFixer\Config();
return $config->setRules([
        '@PSR12' => true,
        'array_syntax' => ['syntax' => 'short'],
        'function_typehint_space' => true,
        'magic_method_casing' => true,
        'magic_constant_casing' => true,
        'native_function_casing' => true,
        'no_blank_lines_after_phpdoc' => true,
        'no_unneeded_curly_braces' => true,
        'no_useless_return' => true,
        'standardize_not_equals' => true,
        'trim_array_spaces' => true,
        'visibility_required' => ['elements' => [
            'property',
            'method',
        ]],
        'yoda_style' => true,
        'whitespace_after_comma_in_array' => true,
        'trailing_comma_in_multiline' => true,
    ])
    ->setFinder($finder)
;
