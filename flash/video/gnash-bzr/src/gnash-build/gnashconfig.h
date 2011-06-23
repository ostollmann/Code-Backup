/* gnashconfig.h.  Generated from gnashconfig.h.in by configure.  */
/* gnashconfig.h.in.  Generated from configure.ac by autoheader.  */

/* Define if building universal (internal helper macro) */
/* #undef AC_APPLE_UNIVERSAL_BUILD */

/* this is an AmigaOS4 platform */
/* #undef AMIGAOS4_HOST */

/* This is an Android build */
/* #undef ANDROID */

/* if the library is missing, don't use it. */
/* #undef BOOST_MULTI_INDEX_DISABLE_SERIALIZATION */

/* Build GTK Canvas support for the GTK Widget */
#define BUILD_CANVAS /**/

/* Add support for writing a standalone executable launcher for movies
   embedded in web pages */
#define CREATE_STANDALONE_GNASH_LAUNCHER /**/

/* this is a Darwin platform */
/* #undef DARWIN_HOST */

/* Speex codec available */
#define DECODING_SPEEX 1

/* Default Flash major version */
#define DEFAULT_FLASH_MAJOR_VERSION "10"

/* Default Flash minor version */
#define DEFAULT_FLASH_MINOR_VERSION "1"

/* Default 3-letter platform identifier for version string */
#define DEFAULT_FLASH_PLATFORM_ID "LNX"

/* Default Flash revision number */
#define DEFAULT_FLASH_REV_NUMBER "999"

/* Default value for System.capabilities.os */
#define DEFAULT_FLASH_SYSTEM_OS "GNU/Linux"

/* Path to default font */
#define DEFAULT_FONTFILE "/usr/share/fonts/TTF/verdana.ttf"

/* Default SharedObject base directory */
#define DEFAULT_SOL_SAFEDIR "~/.gnash/SharedObjects"

/* Default streams timeout in seconds */
#define DEFAULT_STREAMS_TIMEOUT 60

/* Enable AVM2 code */
/* #undef ENABLE_AVM2 */

/* Enable double buffering */
/* #undef ENABLE_DOUBLE_BUFFERING */

/* Enable using a file instead of a real framebuffer */
/* #undef ENABLE_FAKE_FRAMEBUFFER */

/* Use FFmpeg for media decoding */
#define ENABLE_FFMPEG_MEDIA 1

/* Use gstreamer for media decoding */
/* #undef ENABLE_GST_MEDIA */

/* Use haiku for media decoding */
/* #undef ENABLE_HAIKU_MEDIA */

/* Define to 1 if translation of program messages to the user's native
   language is requested. */
#define ENABLE_NLS 1

/* Define if avcodec_decode_audio2 can be used. */
#define FFMPEG_AUDIO2 1

/* Define if ffmpeg can decode NELLYMOSER audio */
#define FFMPEG_NELLYMOSER 1

/* Define if ffmpeg can play VP6. */
#define FFMPEG_VP6 1

/* Define if ffmpeg can play VP6A. */
#define FFMPEG_VP6A 1

/* Fix i810 LOD bias problem */
/* #undef FIX_I810_LOD_BIAS */

/* this is a FreeBSD platform */
/* #undef FREEBSD_HOST */

/* Enable FPS debugging code */
/* #undef GNASH_FPS_DEBUG */

/* this is a Haiku platform */
/* #undef HAIKU_HOST */

/* "Has the Gstreamer Plugin Dev package installed." */
/* #undef HAS_GSTREAMER_PLUGINS_BASE */

/* Define this if you want to enable python usage */
/* #undef HAS_PYTHON */

/* Access Linux Platform framework */
/* #undef HAVE_ALP */

/* Define to 1 if you have the `argz_add' function. */
#define HAVE_ARGZ_ADD 1

/* Define to 1 if you have the `argz_append' function. */
#define HAVE_ARGZ_APPEND 1

/* Define to 1 if you have the `argz_count' function. */
#define HAVE_ARGZ_COUNT 1

/* Define to 1 if you have the `argz_create_sep' function. */
#define HAVE_ARGZ_CREATE_SEP 1

/* Define to 1 if you have the <argz.h> header file. */
#define HAVE_ARGZ_H 1

/* Define to 1 if you have the `argz_insert' function. */
#define HAVE_ARGZ_INSERT 1

/* Define to 1 if you have the `argz_next' function. */
#define HAVE_ARGZ_NEXT 1

/* Define to 1 if you have the `argz_stringify' function. */
#define HAVE_ARGZ_STRINGIFY 1

/* Define if you have the atk/atk.h header */
#define HAVE_ATK_ATK_H 1

/* Has broken float support */
/* #undef HAVE_BROKEN_FLOAT */

/* Define if you have the cairo.h header */
/* #undef HAVE_CAIRO_H */

/* Define to 1 if you have the MacOS X function CFLocaleCopyCurrent in the
   CoreFoundation framework. */
/* #undef HAVE_CFLOCALECOPYCURRENT */

/* Define to 1 if you have the MacOS X function CFPreferencesCopyAppValue in
   the CoreFoundation framework. */
/* #undef HAVE_CFPREFERENCESCOPYAPPVALUE */

/* Has clock_gettime() */
#define HAVE_CLOCK_GETTIME 1

/* Define to 1 if you have the `closedir' function. */
#define HAVE_CLOSEDIR 1

/* Define to 1 if you have the `CreateFileMappingA' function. */
/* #undef HAVE_CREATEFILEMAPPINGA */

/* Define to 1 if you have the <curl/curl.h> header file. */
#define HAVE_CURL_CURL_H 1

/* Define if the GNU dcgettext() function is already present or preinstalled.
   */
#define HAVE_DCGETTEXT 1

/* Define to 1 if you have the declaration of `cygwin_conv_path', and to 0 if
   you don't. */
/* #undef HAVE_DECL_CYGWIN_CONV_PATH */

/* Define if you have the dejagnu.h header */
/* #undef HAVE_DEJAGNU_H */

/* Define to 1 if you have the <dirent.h> header file, and it defines `DIR'.
   */
#define HAVE_DIRENT_H 1

/* Define if you have the GNU dld library. */
/* #undef HAVE_DLD */

/* Define to 1 if you have the <dld.h> header file. */
/* #undef HAVE_DLD_H */

/* Define to 1 if you have the `dlerror' function. */
#define HAVE_DLERROR 1

/* Define to 1 if you have the <dlfcn.h> header file. */
#define HAVE_DLFCN_H 1

/* Define to 1 if you have the <dl.h> header file. */
/* #undef HAVE_DL_H */

/* Define if you have the _dyld_func_lookup function. */
/* #undef HAVE_DYLD */

/* Define if you have the EGL/egl.h header */
/* #undef HAVE_EGL_EGL_H */

/* Define to 1 if you have the <endian.h> header file. */
#define HAVE_ENDIAN_H 1

/* Define to 1 if the system has the type `error_t'. */
#define HAVE_ERROR_T 1

/* Define if you have the expat.h header */
#define HAVE_EXPAT_H 1

/* Has the Linux splice() system call */
#define HAVE_FCNTL_SPLICE 1

/* Has the Linux tee() system call */
#define HAVE_FCNTL_TEE 1

/* Define if you have avcodec.h installed. */
/* #undef HAVE_FFMPEG_AVCODEC_H */

/* Define if avformat.h is found */
/* #undef HAVE_FFMPEG_AVFORMAT_H */

/* Define if swscale.h is found */
/* #undef HAVE_FFMPEG_SWSCALE_H */

/* Defined if ffmpeg/vaapi.h is found */
/* #undef HAVE_FFMPEG_VAAPI_H */

/* Has finite */
#define HAVE_FINITE 1

/* Define if you have the fltk/FL_API.h header */
/* #undef HAVE_FLTK_FL_API_H */

/* Define if you have the fontconfig/fontconfig.h header */
#define HAVE_FONTCONFIG_FONTCONFIG_H 1

/* Define to 1 if you have the <freetype2/freetype/freetype.h> header file. */
/* #undef HAVE_FREETYPE2_FREETYPE_FREETYPE_H */

/* Define to 1 if you have the `ftime' function. */
#define HAVE_FTIME 1

/* __FUNCTION__ is defined */
#define HAVE_FUNCTION 1

/* Define to 1 if you have the `getopt' function. */
#define HAVE_GETOPT 1

/* Define to 1 if you have the <getopt.h> header file. */
#define HAVE_GETOPT_H 1

/* Has getpwnam */
#define HAVE_GETPWNAM 1

/* Define if the GNU gettext() function is already present or preinstalled. */
#define HAVE_GETTEXT 1

/* Define to 1 if you have the `gettimeofday' function. */
#define HAVE_GETTIMEOFDAY 1

/* Define if you have the gif_lib.h header */
#define HAVE_GIF_LIB_H 1

/* Define to 1 if you have the <GLES2/gl2.h> header file. */
/* #undef HAVE_GLES2_GL2_H */

/* Define to 1 if you have the <GLES/egl.h> header file. */
/* #undef HAVE_GLES_EGL_H */

/* Have OpenGL-ES GLES/glext.h */
/* #undef HAVE_GLES_GLEXT_H */

/* Have OpenGL-ES GLES/gl.h */
/* #undef HAVE_GLES_GL_H */

/* Has GLIB library installed */
#define HAVE_GLIB 1

/* Define to 1 if you have the <GL/gl.h> header file. */
/* #undef HAVE_GL_GL_H */

/* Define this for GCC-visibility. */
/* #undef HAVE_GNUC_VISIBILITY */

/* Define if you have the gst/app/gstappsink.h header */
/* #undef HAVE_GST_APP_GSTAPPSINK_H */

/* Define if you have the gst/gst.h header */
/* #undef HAVE_GST_GST_H */

/* Define if you have the gst/interfaces/probeprobe.h header */
/* #undef HAVE_GST_INTERFACES_PROBEPROBE_H */

/* Define if you have the gst/pbutils/install-plugins.h header */
/* #undef HAVE_GST_PBUTILS_INSTALL_PLUGINS_H */

/* Use GTK2 for windowing */
#define HAVE_GTK2 1

/* GTKGLExt header */
/* #undef HAVE_GTK_GTKGL_H */

/* Define to 1 if you have the <gtk/gtk.h> header file. */
/* #undef HAVE_GTK_GTK_H */

/* has the Hildon mobile framework */
/* #undef HAVE_HILDON */

/* Define if you have the iconv() function. */
/* #undef HAVE_ICONV */

/* Define to 1 if you have the <ieeefp.h> header file. */
/* #undef HAVE_IEEEFP_H */

/* Define to 1 if you have the <inttypes.h> header file. */
#define HAVE_INTTYPES_H 1

/* Use shm_info */
/* #undef HAVE_IPC_INFO */

/* Has isfinite */
#define HAVE_ISFINITE 1

/* Define if you have the jpeglib.h header */
#define HAVE_JPEGLIB_H 1

/* Have KDE 3.x installed */
/* #undef HAVE_KDE3 */

/* Have KDE 4.x installed */
/* #undef HAVE_KDE4 */

/* Define to 1 if you have the <kde4/kapplication.h> header file. */
/* #undef HAVE_KDE4_KAPPLICATION_H */

/* Define to 1 if you have the <kde/kapplication.h> header file. */
/* #undef HAVE_KDE_KAPPLICATION_H */

/* Define if you have avcodec.h installed. */
#define HAVE_LIBAVCODEC_AVCODEC_H 1

/* Defined if libavcodec/vaapi.h is found */
#define HAVE_LIBAVCODEC_VAAPI_H 1

/* Define if avformat.h is found */
#define HAVE_LIBAVFORMAT_AVFORMAT_H 1

/* Define to 1 if you have the `bz2' library (-lbz2). */
#define HAVE_LIBBZ2 1

/* Define to 1 if you have the `c' library (-lc). */
#define HAVE_LIBC 1

/* Define if you have the libdl library or equivalent. */
#define HAVE_LIBDL 1

/* Define if libdlloader will be built on this platform */
#define HAVE_LIBDLLOADER 1

/* Define to 1 if you have the <libgen.h> header file. */
#define HAVE_LIBGEN_H 1

/* Define to 1 if you have the `lber' library (-llber). */
#define HAVE_LIBLBER 1

/* Define to 1 if you have the `rt' library (-lrt). */
#define HAVE_LIBRT 1

/* Define if you have the libssh/libssh.h header */
/* #undef HAVE_LIBSSH_LIBSSH_H */

/* Define if swscale.h is found */
#define HAVE_LIBSWSCALE_SWSCALE_H 1

/* Define to 1 if you have the `X11' library (-lX11). */
#define HAVE_LIBX11 1

/* Define to 1 if you have the `Xi' library (-lXi). */
/* #undef HAVE_LIBXI */

/* Define to 1 if you have the `localtime_r' function. */
#define HAVE_LOCALTIME_R 1

/* Has __thread (local thread storage) support */
#define HAVE_LOCAL_THREAD_STORAGE 1

/* extern timezone is a long integer, not a function */
#define HAVE_LONG_TIMEZONE 1

/* Define this if a modern libltdl is already installed */
#define HAVE_LTDL 1

/* Define to 1 if you have the <machine/endian.h> header file. */
/* #undef HAVE_MACHINE_ENDIAN_H */

/* Define to 1 if you have the <mach-o/dyld.h> header file. */
/* #undef HAVE_MACH_O_DYLD_H */

/* Has mallinfo() */
#define HAVE_MALLINFO 1

/* Define to 1 if you have the <malloc.h> header file. */
#define HAVE_MALLOC_H 1

/* Define to 1 if you have the <malloc/malloc.h> header file. */
/* #undef HAVE_MALLOC_MALLOC_H */

/* Define to 1 if you have the `memmove' function. */
#define HAVE_MEMMOVE 1

/* Define to 1 if you have the <memory.h> header file. */
#define HAVE_MEMORY_H 1

/* Define to 1 if you have the <ming.h> header file. */
/* #undef HAVE_MING_H */

/* Define to 1 if you have the `mmap' function. */
#define HAVE_MMAP 1

/* Defined if you have MySQL installed */
/* #undef HAVE_MYSQL */

/* Define to 1 if you have the <ndir.h> header file, and it defines `DIR'. */
/* #undef HAVE_NDIR_H */

/* Define if you have the nspr.h header */
#define HAVE_NSPR_H 1

/* Define to 1 if you have the `opendir' function. */
#define HAVE_OPENDIR 1

/* Define if you have the openssl/ssl.h header */
/* #undef HAVE_OPENSSL_SSL_H */

/* Define if you have the png.h header */
#define HAVE_PNG_H 1

/* Define to 1 if you have the <poll.h> header file. */
#define HAVE_POLL_H 1

/* Define to 1 if you have the `ppoll' function. */
#define HAVE_PPOLL 1

/* Define if libtool can extract symbol lists from object files. */
#define HAVE_PRELOADED_SYMBOLS 1

/* __PRETTY_FUNCTION__ is defined */
#define HAVE_PRETTY_FUNCTION 1

/* Define to 1 if you have the `pselect' function. */
#define HAVE_PSELECT 1

/* Define if you have POSIX threads libraries and header files. */
#define HAVE_PTHREADS 1

/* Define to 1 if you have the <pwd.h> header file. */
#define HAVE_PWD_H 1

/* Define to 1 if you have the <pythonrun.h> header file. */
/* #undef HAVE_PYTHONRUN_H */

/* Have QT 3.x installed */
/* #undef HAVE_QT3 */

/* Have QT 4.x installed */
/* #undef HAVE_QT4 */

/* Define to 1 if you have the `readdir' function. */
#define HAVE_READDIR 1

/* Define to 1 if you have the `scandir' function. */
#define HAVE_SCANDIR 1

/* We have SDL support */
#define HAVE_SDL_H 1

/* Has the Linux sendfile() system call */
#define HAVE_SENDFILE 1

/* Define if you have the shl_load function. */
/* #undef HAVE_SHL_LOAD */

/* Define to 1 if you have the `shmat' function. */
#define HAVE_SHMAT 1

/* Define to 1 if you have the `shmdt' function. */
#define HAVE_SHMDT 1

/* Define to 1 if you have the `shmget' function. */
#define HAVE_SHMGET 1

/* Define to 1 if you have the `shm_open' function. */
#define HAVE_SHM_OPEN 1

/* Define to 1 if you have the `shm_unlink' function. */
#define HAVE_SHM_UNLINK 1

/* Define to 1 if you have the <signal.h> header file. */
#define HAVE_SIGNAL_H 1

/* Define to 1 if you have the `socket' function. */
#define HAVE_SOCKET 1

/* Define if you have the speex.h header */
#define HAVE_SPEEX_H 1

/* Define if you have the speex_resampler.h header */
#define HAVE_SPEEX_RESAMPLER_H 1

/* Define to 1 if you have the <stdint.h> header file. */
#define HAVE_STDINT_H 1

/* Define to 1 if you have the <stdlib.h> header file. */
#define HAVE_STDLIB_H 1

/* Has strcasecmp */
#define HAVE_STRINGCASECMP 1

/* Define to 1 if you have the <strings.h> header file. */
#define HAVE_STRINGS_H 1

/* Define to 1 if you have the <string.h> header file. */
#define HAVE_STRING_H 1

/* Define to 1 if you have the `strlcat' function. */
/* #undef HAVE_STRLCAT */

/* Define to 1 if you have the `strlcpy' function. */
/* #undef HAVE_STRLCPY */

/* Define if swscale.h is found */
/* #undef HAVE_SWSCALE_H */

/* Define to 1 if you have the `sysconf' function. */
#define HAVE_SYSCONF 1

/* Define to 1 if you have the <sys/dir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_DIR_H */

/* Define to 1 if you have the <sys/dl.h> header file. */
/* #undef HAVE_SYS_DL_H */

/* Define to 1 if you have the <sys/epoll.h> header file. */
#define HAVE_SYS_EPOLL_H 1

/* Define to 1 if you have the <sys/ndir.h> header file, and it defines `DIR'.
   */
/* #undef HAVE_SYS_NDIR_H */

/* Define to 1 if you have the <sys/stat.h> header file. */
#define HAVE_SYS_STAT_H 1

/* Define to 1 if you have the <sys/time.h> header file. */
#define HAVE_SYS_TIME_H 1

/* Define to 1 if you have the <sys/types.h> header file. */
#define HAVE_SYS_TYPES_H 1

/* Define to 1 if you have the <sys/utsname.h> header file. */
#define HAVE_SYS_UTSNAME_H 1

/* struct tm has member tm_gmtoff */
#define HAVE_TM_GMTOFF 1

/* Define if you have the tslib.h header */
/* #undef HAVE_TSLIB_H */

/* Define to 1 if you have the `tzset' function. */
#define HAVE_TZSET 1

/* Define to 1 if you have the <unistd.h> header file. */
#define HAVE_UNISTD_H 1

/* Define if you have the va/va_glx.h header */
/* #undef HAVE_VA_VA_GLX_H */

/* Define if you have the va/va.h header */
#define HAVE_VA_VA_H 1

/* Define if you have the va/va_x11.h header */
#define HAVE_VA_VA_X11_H 1

/* Define if you have the vg/openvg.h header */
/* #undef HAVE_VG_OPENVG_H */

/* This is defined is we are on Win32 */
/* #undef HAVE_WINSOCK */

/* Define to 1 if you have the <winsock2.h> header file. */
/* #undef HAVE_WINSOCK2_H */

/* Define to 1 if you have the <winsock.h> header file. */
/* #undef HAVE_WINSOCK_H */

/* This value is set to 1 to indicate that the system argz facility works */
#define HAVE_WORKING_ARGZ 1

/* X11 headers and libraries */
/* #undef HAVE_X11 */

/* Define to 1 if you have the <X11/X.h> header file. */
/* #undef HAVE_X11_X_H */

/* Define if you have the Xft.h header */
/* #undef HAVE_XFT_H */

/* X Video extension header and library */
#define HAVE_XV 1

/* Define if you have the zlib.h header */
#define HAVE_ZLIB_H 1

/* __func__ is defined */
#define HAVE_func 1

/* Has the key field in ipc_perm */
#define IPC_PERM_KEY __key

/* this is a Linux platform */
#define LINUX_HOST 1

/* Define if the OS needs help to load dependent libraries for dlopen(). */
/* #undef LTDL_DLOPEN_DEPLIBS */

/* Define to the system default library search path. */
#define LT_DLSEARCH_PATH "/lib:/usr/lib:/usr/lib/libfakeroot:/usr/lib32:/usr/lib/xulrunner-1.9.2"

/* The archive extension */
#define LT_LIBEXT "a"

/* The archive prefix */
#define LT_LIBPREFIX "lib"

/* Define to the extension used for runtime loadable modules, say, ".so". */
#define LT_MODULE_EXT ".so"

/* Define to the name of the environment variable that determines the run-time
   module search path. */
#define LT_MODULE_PATH_VAR "LD_LIBRARY_PATH"

/* Define to the sub-directory in which libtool stores uninstalled libraries.
   */
#define LT_OBJDIR ".libs/"

/* Define if dlsym() requires a leading underscore in symbol names. */
/* #undef NEED_USCORE */

/* this is a NetBSD platform */
/* #undef NETBSD_HOST */

/* Is not based on the SGI GL */
/* #undef NOT_SGI_GL */

/* this is an OpenBSD platform */
/* #undef OPENBSD_HOST */

/* Name of package */
#define PACKAGE "gnash"

/* Define to the address where bug reports for this package should be sent. */
#define PACKAGE_BUGREPORT ""

/* Define to the full name of this package. */
#define PACKAGE_NAME "gnash"

/* Define to the full name and version of this package. */
#define PACKAGE_STRING "gnash trunk"

/* Define to the one symbol short name of this package. */
#define PACKAGE_TARNAME "gnash"

/* Define to the home page for this package. */
#define PACKAGE_URL ""

/* Define to the version of this package. */
#define PACKAGE_VERSION "trunk"

/* ABGR32 pixel format */
#define PIXELFORMAT_ABGR32 1

/* ARGB32 pixel format */
#define PIXELFORMAT_ARGB32 1

/* BGR24 pixel format */
#define PIXELFORMAT_BGR24 1

/* BGRA32 pixel format */
#define PIXELFORMAT_BGRA32 1

/* RGB24 pixel format */
#define PIXELFORMAT_RGB24 1

/* RGB555 pixel format */
#define PIXELFORMAT_RGB555 1

/* RGB565 pixel format */
#define PIXELFORMAT_RGB565 1

/* RGBA32 pixel format */
#define PIXELFORMAT_RGBA32 1

/* Define to necessary symbol if this constant uses a non-standard name on
   your system. */
/* #undef PTHREAD_CREATE_JOINABLE */

/* Use AntiGrain renderer */
#define RENDERER_AGG /**/

/* Use cairo renderer */
/* #undef RENDERER_CAIRO */

/* Use OpenGL-ES version 1.3 */
/* #undef RENDERER_EGL */

/* Use OpenGL-ES version 1.x */
/* #undef RENDERER_GLES */

/* Use OpenGL-ES v2 version 2 */
/* #undef RENDERER_GLES2 */

/* Use OpenGL renderer */
/* #undef RENDERER_OPENGL */

/* Speex resampler available */
#define RESAMPLING_SPEEX 1

/* this is a Solaris platform */
/* #undef SOLARIS_HOST */

/* Use AmigaOS AHI for sound handling */
/* #undef SOUND_AHI */

/* Use Haiku's Media Kit for sound handling */
/* #undef SOUND_MKIT */

/* Use SDL for sound handling */
#define SOUND_SDL 1

/* Define to 1 if you have the ANSI C header files. */
#define STDC_HEADERS 1

/* Enable cgi-bin processes for Cygnal */
#define USE_CGIBIN 1

/* Define this if you want to enable curl usage */
#define USE_CURL 1

/* Build the DBUS extension */
/* #undef USE_DBUS_EXT */

/* Flash Debugger support */
/* #undef USE_DEBUGGER */

/* Build the DejaGnu extension */
/* #undef USE_DEJAGNU_EXT */

/* Build the FileIO extension */
/* #undef USE_FILEIO_EXT */

/* Define this if you want to enable freetype usage */
#define USE_FREETYPE 1

/* Use the GIF library */
#define USE_GIF 1

/* Use GtkGLExt extension */
/* #undef USE_GTKGLEXT */

/* Build all the extensions */
/* #undef USE_GTK_EXT */

/* Use the Hildon mobile framework */
/* #undef USE_HILDON */

/* Add support for a directly using Linux Input Event Devices */
/* #undef USE_INPUT_EVENTS */

/* Use jemalloc instead of system malloc */
#define USE_JEMALLOC /**/

/* Add support for directly using a PS/2 Keyboard */
/* #undef USE_KEYBOARD_PS2 */

/* Build the Launcher extension */
/* #undef USE_LAUNCHER_EXT */

/* Support LocalConnection */
#define USE_LC 1

/* Support LocalConnection */
/* #undef USE_LC_TRACE */

/* LIRC daemon support */
/* #undef USE_LIRC */

/* Build the LIRC extension */
/* #undef USE_LIRC_EXT */

/* GUI Menu support */
#define USE_MENUS /**/

/* Add support for a directly using a PS/2 Mouse */
/* #undef USE_MOUSE_PS2 */

/* Build the MySQL extension */
/* #undef USE_MYSQL_EXT */

/* Use the PNG library */
#define USE_PNG 1

/* Use POSIX shared memory */
/* #undef USE_POSIX_SHM */

/* Shared Objects are read-only */
/* #undef USE_SOL_READONLY */

/* Use SSH for authentication */
/* #undef USE_SSH */

/* Use SSL for authentication */
/* #undef USE_SSL */

/* Support statistics collecting for the queue buffers */
/* #undef USE_STATS_BUFFERS */

/* Support statistics collecting for the cache */
#define USE_STATS_CACHE 1

/* Support statistics collecting for all memory profiling */
/* #undef USE_STATS_MEMORY */

/* Support statistics collecting for the queues */
/* #undef USE_STATS_QUEUE */

/* View SWF information */
#define USE_SWFTREE /**/

/* Use SYSV shared memory for compatability */
#define USE_SYSV_SHM 1

/* Testsuite support, maintainers option only */
#define USE_TESTSUITE /**/

/* Use a tslib supported touchscreen */
/* #undef USE_TSLIB */

/* Version number of package */
#define VERSION "trunk"

/* this is a Win32 platform */
/* #undef WIN32_HOST */

/* this is a 64 platform */
/* #undef WORDSIZE */

/* Define WORDS_BIGENDIAN to 1 if your processor stores words with the most
   significant byte first (like Motorola and SPARC, unlike Intel). */
#if defined AC_APPLE_UNIVERSAL_BUILD
# if defined __BIG_ENDIAN__
#  define WORDS_BIGENDIAN 1
# endif
#else
# ifndef WORDS_BIGENDIAN
/* #  undef WORDS_BIGENDIAN */
# endif
#endif

/* Write files while streaming */
#define WRITE_FILE /**/

/* Define so that glibc/gnulib argp.h does not typedef error_t. */
/* #undef __error_t_defined */

/* this is a 64 bit powerpc */
/* #undef __powerpc64__ */

/* Define to empty if `const' does not conform to ANSI C. */
/* #undef const */

/* Define to a type to use for `error_t' if it is not otherwise available. */
/* #undef error_t */

/* Define to `__inline__' or `__inline' if that's what the C compiler
   calls it, or to nothing if 'inline' is not supported under any name.  */
#ifndef __cplusplus
/* #undef inline */
#endif
