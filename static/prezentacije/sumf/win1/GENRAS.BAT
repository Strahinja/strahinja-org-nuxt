@rem = '--*-Perl-*--
@echo off
d:\perl\bin\perl -x -S %0 %1 %2 %3 %4 %5 %6 %7 %8 %9
goto endofperl
@rem ';

sub deltr {
   my($dirtodel, @rest) = @_;
   if (!opendir(MYDIR, "$dirtodel")) {
      rmdir $dirtodel;
      return;
   }
   for $file (readdir(MYDIR)) {
      -f $file && unlink "$dirtodel\\$file";
   }
   rmdir $dirtodel;
}

%rasp=(
  'latin2' => 'iso2',
  'cp1250' => 'win0',
  'ascii'  => 'ascii',
  'iso'    => 'iso5',
);
deltr "temp";
mkdir "temp", "";
opendir(DIR, ".") || die "Ne mogu da procitam trenutni direktorijum?!?!";
for $file (readdir(DIR)) {
   if (!( -d $file)) {
      if (!($file =~ /\.bat/ig)) {
         for $ras (keys %rasp) {
            print "type $file | unistd -h -uwin $ras > temp\\$file$ras\n";
            system "type $file | unistd -h -uwin $ras > temp\\$file$ras"
               || die "First exec not ok!";
            print "move temp\\$file$ras ..\\$rasp{$ras}\\$file\n";
            system "move temp\\$file$ras ..\\$rasp{$ras}\\$file"
               || die "Second exec nto ok!";
         }
      }
   }
}
closedir DIR;
deltr "temp";
__END__
:endofperl