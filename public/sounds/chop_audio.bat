@echo off
setlocal enabledelayedexpansion

REM Input file
set input_file="ALLSOUNDS.mp3"

REM start and corresponding gun names
set start[0]=0:00:00
set end[0]=0:00:31
set gun_names[0]=PM

set start[1]=0:01:32
set end[1]=0:02:09
set gun_names[1]=MP-443_Grach

set start[2]=0:02:09
set end[2]=0:02:44
set gun_names[2]=P226R

set start[3]=0:03:17
set end[3]=0:03:50
set gun_names[3]=TT_Gold

set start[4]=0:03:50
set end[4]=0:04:25
set gun_names[4]=SR-1MP

set start[5]=0:04:25
set end[5]=0:05:01
set gun_names[5]=GLOCK_17

set start[6]=0:05:01
set end[6]=0:05:34
set gun_names[6]=GLOCK_18C

set start[7]=0:05:34
set end[7]=0:06:09
set gun_names[7]=Glock_19X

set start[8]=0:06:09
set end[8]=0:06:45
set gun_names[8]=APS

set start[9]=0:06:45
set end[9]=0:07:21
set gun_names[9]=APB

set start[10]=0:07:21
set end[10]=0:07:57
set gun_names[10]=M9A3

set start[11]=0:07:57
set end[11]=0:08:33
set gun_names[11]=Five-seven

set start[12]=0:08:33
set end[12]=0:09:09
set gun_names[12]=Five-seven_FDE

set start[13]=0:09:09
set end[13]=0:09:39
set gun_names[13]=M1911A1

set start[14]=0:09:39
set end[14]=0:10:09
set gun_names[14]=M45A1

set start[15]=0:10:09
set end[15]=0:10:36
set gun_names[15]=PL-15

set start[16]=0:10:36
set end[16]=0:11:10
set gun_names[16]=HK_USP

set start[17]=0:11:10
set end[17]=0:12:08
set gun_names[17]=Chiappa_Rhino_200DS_9x19

set start[18]=0:12:08
set end[18]=0:13:04
set gun_names[18]=Chiappa_Rhino_50DS_.357

set start[19]=0:13:04
set end[19]=0:13:55
set gun_names[19]=RSh-12

set start[20]=0:13:55
set end[20]=0:14:20
set gun_names[20]=SP-81

set start[21]=0:14:20
set end[21]=0:15:01
set gun_names[21]=PPSH-41

set start[22]=0:15:01
set end[22]=0:15:36
set gun_names[22]=PP-91_Kedr

set start[23]=0:15:36
set end[23]=0:16:11
set gun_names[23]=PP-91_Kedr-B

set start[24]=0:16:11
set end[24]=0:16:47
set gun_names[24]=PP-9_Klin

set start[25]=0:16:47
set end[25]=0:17:23
set gun_names[25]=MP5

set start[26]=0:17:23
set end[26]=0:17:58
set gun_names[26]=MP5K-N

set start[27]=0:17:58
set end[27]=0:18:34
set gun_names[27]=MPX

set start[28]=0:18:34
set end[28]=0:19:10
set gun_names[28]=MP9

set start[29]=0:19:10
set end[29]=0:19:46
set gun_names[29]=MP9-N

set start[30]=0:19:46
set end[30]=0:20:29
set gun_names[30]=Saiga-9

set start[31]=0:20:29
set end[31]=0:21:10
set gun_names[31]=PP-19-01_Vityaz

set start[32]=0:21:10
set end[32]=0:21:48
set gun_names[32]=MP7A1

set start[33]=0:21:48
set end[33]=0:22:26
set gun_names[33]=MP7A2

set start[34]=0:22:26
set end[34]=0:23:07
set gun_names[34]=FN_P90

set start[35]=0:23:07
set end[35]=0:23:46
set gun_names[35]=UMP45

set start[36]=0:23:46
set end[36]=0:24:25
set gun_names[36]=KRISS_Vector_.45ACP

set start[37]=0:24:25
set end[37]=0:25:04
set gun_names[37]=KRISS_Vector_9x19

set start[38]=0:25:04
set end[38]=0:25:43
set gun_names[38]=STM-9_Gen.2_9x19_carabine

set start[39]=0:25:43
set end[39]=0:26:22
set gun_names[39]=SR-2M

set start[40]=0:26:22
set end[40]=0:27:04
set gun_names[40]=AKS-74

set start[41]=0:27:04
set end[41]=0:27:47
set gun_names[41]=AKS-74U

set start[42]=0:27:47
set end[42]=0:28:29
set gun_names[42]=AKS-74UN

set start[43]=0:28:29
set end[43]=0:29:09
set gun_names[43]=AKS-74UB

set start[44]=0:29:09
set end[44]=0:29:51
set gun_names[44]=AKS-74N

set start[45]=0:29:51
set end[45]=0:30:32
set gun_names[45]=AK-74

set start[46]=0:30:32
set end[46]=0:31:12
set gun_names[46]=AK-74N

set start[47]=0:31:12
set end[47]=0:31:54
set gun_names[47]=AK-74M

set start[48]=0:31:54
set end[48]=0:32:35
set gun_names[48]=AKM

set start[49]=0:32:35
set end[49]=0:33:17
set gun_names[49]=AKMN

set start[50]=0:33:17
set end[50]=0:34:01
set gun_names[50]=AKMS

set start[51]=0:34:01
set end[51]=0:34:45
set gun_names[51]=AKMSN

set start[52]=0:34:45
set end[52]=0:35:26
set gun_names[52]=AK-101

set start[53]=0:35:26
set end[53]=0:36:09
set gun_names[53]=AK-102

set start[54]=0:36:09
set end[54]=0:36:51
set gun_names[54]=AK-103

set start[55]=0:36:51
set end[55]=0:37:33
set gun_names[55]=AK-104

set start[56]=0:37:33
set end[56]=0:38:15
set gun_names[56]=AK-105

set start[57]=0:38:15
set end[57]=0:38:55
set gun_names[57]=RD-704

set start[58]=0:38:55
set end[58]=0:39:34
set gun_names[58]=MK-47

set start[59]=0:39:34
set end[59]=0:40:07
set gun_names[59]=M4A1

set start[60]=0:40:07
set end[60]=0:40:42
set gun_names[60]=HK416A5

set start[61]=0:40:42
set end[61]=0:41:14
set gun_names[61]=MCX

set start[62]=0:41:14
set end[62]=0:41:53
set gun_names[62]=MDR_5.56

set start[63]=0:41:53
set end[63]=0:42:28
set gun_names[63]=MDR_7.62

set start[64]=0:42:28
set end[64]=0:43:07
set gun_names[64]=FN_SCAR-L

set start[65]=0:43:07
set end[65]=0:43:47
set gun_names[65]=FN_SCAR-L_FDE

set start[66]=0:43:47
set end[66]=0:44:24
set gun_names[66]=FN_SCAR-H

set start[67]=0:44:24
set end[67]=0:45:02
set gun_names[67]=FN_SCAR-H_FDE

set start[68]=0:45:02
set end[68]=0:45:40
set gun_names[68]=AUG_A1

set start[69]=0:45:40
set end[69]=0:46:14
set gun_names[69]=SA-58

set start[70]=0:46:14
set end[70]=0:46:49
set gun_names[70]=AUG_A3

set start[71]=0:46:49
set end[71]=0:47:31
set gun_names[71]=HK_G36

set start[72]=0:47:31
set end[72]=0:48:09
set gun_names[72]=AS-VAL

set start[73]=0:48:09
set end[73]=0:48:49
set gun_names[73]=ASh-12

set start[74]=0:48:49
set end[74]=0:49:30
set gun_names[74]=RPK-16

set start[75]=0:49:30
set end[75]=0:50:26
set gun_names[75]=SKS

set start[76]=0:50:26
set end[76]=0:51:07
set gun_names[76]=OP-SKS

set start[77]=0:51:07
set end[77]=0:51:43
set gun_names[77]=VPO-101

set start[78]=0:51:43
set end[78]=0:52:14
set gun_names[78]=VPO-136

set start[79]=0:52:14
set end[79]=0:52:48
set gun_names[79]=VPO-209

set start[80]=0:52:48
set end[80]=0:53:18
set gun_names[80]=ADAR

set start[81]=0:53:18
set end[81]=0:53:55
set gun_names[81]=TX-15

set start[82]=0:53:55
set end[82]=0:54:31
set gun_names[82]=Kel-Tec_RFB

set start[83]=0:54:31
set end[83]=0:55:12
set gun_names[83]=SAG_AK-545

set start[84]=0:55:12
set end[84]=0:55:52
set gun_names[84]=SAG_AK-545_Short

set start[85]=0:55:52
set end[85]=0:56:26
set gun_names[85]=M1A

set start[86]=0:56:26
set end[86]=0:57:07
set gun_names[86]=SVDS

set start[87]=0:57:07
set end[87]=0:57:45
set gun_names[87]=SR-25

set start[88]=0:57:45
set end[88]=0:58:24
set gun_names[88]=HK_G28

set start[89]=0:58:24
set end[89]=0:58:58
set gun_names[89]=RSASS

set start[90]=0:58:58
set end[90]=0:59:34
set gun_names[90]=VSS_Vintorez

set start[91]=0:59:34
set end[91]=1:00:11
set gun_names[91]=Mk-18_.338_LM

set start[92]=1:00:11
set end[92]=1:00:31
set gun_names[92]=MP-18

set start[93]=1:00:31
set end[93]=1:01:15
set gun_names[93]=VPO-215

set start[94]=1:01:15
set end[94]=1:02:13
set gun_names[94]=Mosin_Infantry

set start[95]=1:02:13
set end[95]=1:03:08
set gun_names[95]=Mosin_Sniper

set start[96]=1:03:08
set end[96]=1:03:52
set gun_names[96]=SV-98

set start[97]=1:03:52
set end[97]=1:04:44
set gun_names[97]=M700

set start[98]=1:04:44
set end[98]=1:05:30
set gun_names[98]=DVL-10

set start[99]=1:05:30
set end[99]=1:06:20
set gun_names[99]=T-5000

set start[100]=1:06:20
set end[100]=1:07:08
set gun_names[100]=AXMC

set start[101]=1:07:08
set end[101]=1:07:41
set gun_names[101]=TOZ-106

set start[102]=1:07:41
set end[102]=1:08:10
set gun_names[102]=MP-43-1C

set start[103]=1:08:10
set end[103]=1:09:02
set gun_names[103]=MTs_255-12ga

set start[104]=1:09:02
set end[104]=1:09:41
set gun_names[104]=M870

set start[105]=1:09:41
set end[105]=1:10:34
set gun_names[105]=590A1

set start[106]=1:10:34
set end[106]=1:11:15
set gun_names[106]=KS-23M

set start[107]=1:11:15
set end[107]=1:12:05
set gun_names[107]=MP-133

set start[108]=1:12:05
set end[108]=1:12:39
set gun_names[108]=MP-153

set start[109]=1:12:39
set end[109]=1:13:18
set gun_names[109]=MP-155

set start[110]=1:13:18
set end[110]=1:13:56
set gun_names[110]=Benelli_M3

set start[111]=1:13:56
set end[111]=1:14:26
set gun_names[111]=Saiga_12ga

set start[112]=1:14:26
set end[112]=1:14:48
set gun_names[112]=GP-25

set start[113]=1:14:48
set end[113]=1:15:11
set gun_names[113]=M203_40mm

set start[114]=1:15:11
set end[114]=1:15:31
set gun_names[114]=FN_GL40

set start[115]=1:15:31
set end[115]=1:16:11
set gun_names[115]=M32A1_MSGL


REM Example array initialization for demonstration
set count=115

REM Loop through all indices
for /L %%i in (0, 1, %count%) do (
    set start_time=!start[%%i]!
    set end_time=!end[%%i]!
    set gun_name=!gun_names[%%i]!.mp3
    
    echo Processing !gun_name! with start time !start_time! and end time !end_time!
    ffmpeg -i %input_file% -ss !start_time! -to !end_time! -c copy "!gun_name!"
)

echo All iterations completed.

pause