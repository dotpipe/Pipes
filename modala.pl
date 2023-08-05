#!/usr/bin/perl
use strict;
use warnings;
use Data::Util;

open(my $fh, '<:encoding(UTF-8)', $ARGV[0])
  or die "Could not open file '", $ARGV[0], "' $!";

use JSON;
use Data::Dumper qw(Dumper);

my $file_aft = join '', <$fh>;
my $json = decode_json $file_aft;

sub modala
{
        my $json = decode_json $file_aft;
        my ($val, $tempTag, $root, $id) = @_;
        if ($tempTag == undef)
        {
                return;
        }
        my @kv = $val;
        my $temp_arr = @kv['tagname'];
        my $temp = "<". $temp_arr;
        my $text = "";

#       my $everything = $json->second();
        foreach my $nests (@kv)
        {
                my $key = $nests->first;
                my $v = $nests->second;
                if (is_array($v))
                {
                    modala($v, $temp, $root, $id);
                }
                else if (is_number($key) eq false && $key ne "tagname" && $key ne "textcontent" && $key eq "innerHTML" && $key eq "innerText")
                {
                    $temp = $temp . " " . $key . "='" . $v . "'";
                }
                else if (is_number($key) eq false && $key ne "tagname" && ($key eq "textcontent" || $key eq "innerHTML" || $key eq "innerText"))
                {
                    $text = $v;
                }
        }
        print $temp. ">". $text."</". $temp_arr. ">";
}

print modala($json);